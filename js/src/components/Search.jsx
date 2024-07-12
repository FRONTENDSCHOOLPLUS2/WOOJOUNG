import Submit from "@components/Submit";

function Search() {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        location.href = "";
      }}
    >
      <input
        className="dark:bg-gray-600 bg-gray-100 p-1 rounded"
        type="text"
        name="keyword"
      />
      <Submit>검색</Submit>
    </form>
  );
}

export default Search;
