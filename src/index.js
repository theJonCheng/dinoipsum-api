import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import apiService from "./api-service.js";

// User Interface Logic
$(document).ready(function () {
  // Add here
  $("#submit").click(function () {
    const format = "json";
    const numWords = $("#wordsPerPara").val();
    const numParas = $("#paragraphs").val();
    clearFields();
    apiCall(format, numWords, numParas);
  });

  function clearFields() {
    $("#wordsPerPara").val("");
    $("#paragraphs").val("");
  }

  function apiCall(format, numWords, numParas) {
    let promise = apiService.getResults(format, numWords, numParas);

    promise.then(
      function (response) {
        const body = JSON.parse(response);
        console.log(body);
        getElements(body);
      },
      function (error) {
        $(".showErrors").text(
          `There was an error processing your request: ${error}`
        );
      }
    );
  }

  function getElements(response) {
    for (let i = 0; i < response.length; i++) {
      let parsed = [];
      $(".showResults").append(`<p>`);
      for (let j = 0; j < 20; j++) {
        parsed.push(response[i][j] + ", ");
      }
      $(".showResults").append(parsed);
      $(".showResults").append(`</p>`);
    }
  }
});
