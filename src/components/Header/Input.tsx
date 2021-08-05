import React, { useState } from "react";

import styles from "./styles/Input.module.scss";

import { ReactComponent as SearchBtn } from "../../assets/search-btn.svg";

export const Input: React.FC = () => {
  const [search, setSearch] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles.input}>
      <input
        type="text"
        placeholder="Pesquisa"
        value={search}
        onChange={handleChange}
      />
      <button>
        <SearchBtn />
      </button>
    </div>
  );
};
