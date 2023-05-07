const mongoose = require("mongoose");

const caseSchema = new mongoose.Schema({
  id: { type: String },
  bId: { type: String, default: null },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: { type: [String], required: true },

  target: {
    type: Number,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  proposer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  organize: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organize",
    required: true,
  },
  donations: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Donation",
    default: [],
  },
  hash: {
    type: String,
    default: null,
  },
  withdrawHash: {
    type: String,
    default: null,
  },
  Verified: {
    type: Boolean,
    default: false,
  },
});

caseSchema.methods.getDonationInfo = async function () {
  const caseWithDonations = await this.model("Case")
    .findById(this._id)
    .populate({
      path: "donations",
      populate: {
        path: "donor",
        select: "username picture",
      },
    });

  const donorsByTime = caseWithDonations.donations
    .sort((a, b) => new Date(a.donateDate) - new Date(b.donateDate))
    .map(({ donor, amount, donateDate, hash }) => ({
      donor: {
        id: donor._id,
        username: donor.username,
        picture: donor.picture,
      },
      amount,
      donateDate,
      hash,
    }));

  const totalAmount = caseWithDonations.donations.reduce(
    (total, donation) => total + donation.amount,
    0
  );

  const donorsByAmount = {
    100: [],
    500: [],
    1000: [],
    5000: [],
  };

  caseWithDonations.donations.forEach(({ donor, amount, donateDate, hash }) => {
    switch (amount) {
      case 100:
        donorsByAmount[100].push({ donor, donateDate, hash });
        break;
      case 500:
        donorsByAmount[500].push({ donor, donateDate, hash });
        break;
      case 1000:
        donorsByAmount[1000].push({ donor, donateDate, hash });
        break;
      case 5000:
        donorsByAmount[5000].push({ donor, donateDate, hash });
        break;
    }
  });

  return { donorsByTime, totalAmount, donorsByAmount };
};

const Case = mongoose.model("Case", caseSchema);
module.exports = Case;
