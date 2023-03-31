import React, { useEffect, useState } from "react";
import { Akord } from "@akord/akord-js";

const Upload = (props) => {
  const [vaults, setVaults] = useState();
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [state, setState] = useState("INIT");

  async function getVaults() {
    if (!email || !pass)
      //如果 信箱 或 密碼 沒有填寫就return
      return;

    setState("LOADING");
    const { akord } = await Akord.auth.signIn(email, pass);
    const vaults = await akord.vault.list(); //Query user vaults
    console.log(vaults);
    setVaults(vaults);
    setState("LOADED");
  }

  return (
    <>
      {state == "INIT" && (
        <div>
          <h4>Example: List my vaults</h4>
          <p>
            Akord email:
            <br />
            <input
              type="email"
              autoFocus
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>
          <p>
            Password:
            <br />
            <input type="password" onChange={(e) => setPass(e.target.value)} />
          </p>
          <div>
            <button onClick={getVaults}>Get Vaults</button>
          </div>
        </div>
      )}

      {state == "LOADING" && <div>Loading vaults ...</div>}

      {state == "LOADED" && (
        <ol>
          {vaults
            .sort((a, b) => a.name > b.name)
            .map(function (vault, index) {
              return (
                // 這段代碼是一個 JavaScript 函數，它對一個名為 vaults 的陣列進行排序和映射操作。這個陣列中每個元素代表一個“保管庫”，每個保管庫都有一個名字 (name) 和一個 ID (id)，還有一個狀態 (status)。
                // 排序操作使用了 JavaScript 的 sort() 方法，通過比較 a.name 和 b.name 的字母序來確定它們的順序，從而將 vaults 陣列按名字進行升序排列。
                // 排序完成後，使用 map() 方法對每個保管庫進行映射，返回一個新的陣列。在每個映射函數中，將保管庫的名字顯示在列表項 (<li>) 中，並將保管庫的 ID 顯示在括號中。ID 顯示部分是一個包含 HTML 超連結 (<a>) 的代碼片段，該超連結指向一個特定的網頁，該網頁基於保管庫的狀態和 ID 而構建。超連結的文本為保管庫 ID 的前四個字母，加上三個點 (...)，再加上 ID 的最後兩個字母，以避免將 ID 完全顯示在列表中。
                // 最後，使用 key 屬性為每個列表項指定一個唯一的標識符。
                <li key={index}>
                  {vault.name}
                  <code>
                    (
                    <a
                      href={`http://v2.akord.com/vaults/${vault.status.toLowerCase()}/${
                        vault.id
                      }/assets`}
                      target="_blank" //在新的瀏覽器選項卡或窗口中打開。
                    >
                      {vault.id.slice(0, 4) + "..." + vault.id.slice(-2)}

                      {/* 這行代碼使用了字串的 slice() 方法，從 vault.id 這個字串中選取子字串，並將它們組合在一起。具體來說，它將 vault.id 字串的前四個字符提取出來，然後加上三個點 (...)，再加上該字串的最後兩個字符，最後返回組合好的新字串。 */}
                    </a>
                    )
                  </code>
                </li>
              );
            })}
        </ol>
      )}
    </>
  );
};

export default Upload;
