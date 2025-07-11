import { useState } from "react";


const SearchInput = () => {
    const [text, setText] = useState("");
    return (
<div className="search-wrapper">
       <input
        type="text"
      placeholder="Cerca i tuoi prodotti preferiti..."
      className="w-100 search-small-screen"
      value={text}
      onChange={(e) => setText(e.target.value)}
      />
      {text && (
         <button className="clear-btn" onClick={() => setText("")}>
        &#10005;
      </button>
      )}
      </div>
    )
}
export default SearchInput;