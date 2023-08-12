document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("filterForm");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    // console.log(formProps);

    try {
      const authToken = localStorage.getItem("authToken");
      //   console.log(authToken);
      if (!authToken) {
        console.log("Auth token not found. Please log in first.");
        return;
      }
      const cleanAuthToken = authToken.replace(/"/g, "");
      const headers = {
        Authorization: `Bearer ${cleanAuthToken}`,
        "Content-Type": "application/json",
      };

      //   console.log(headers);

      fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: "GET",
        headers: headers,
      })
        .then((res) => res.json())
        .then((data) => {
          const filteredData = data.filter((item) => {
            const title = item.title.toLowerCase();
            const content = item.content.toLowerCase();
            const status = formProps.statusSelect;
            const urgency = formProps.urgencySelect;

            return (
              (title.includes(formProps.searchInput.toLowerCase()) ||
                content.includes(formProps.searchInput.toLowerCase())) &&
              (status === "all" ||
                item.status.toLowerCase() === status.toLowerCase()) &&
              (urgency === "all" ||
                item.urgency.toLowerCase() === urgency.toLowerCase())
            );
          });
          console.log("Filtered Cards:", filteredData);
          return filteredData;
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } catch (err) {
      console.log(err);
    }
  });
});
