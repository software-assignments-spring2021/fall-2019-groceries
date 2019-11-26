const {ProductSearch} = require("./productSearch");

class Marketplace {


    getProductSearchResults(productName) {
        var Search = new ProductSearch();
        var productSearchResults = Search.searchItem(productName);



        return productSearchResults;
    }


    

}