# e-Shop
Launch App here - 
## Outline

This project is designed to reinforce React learnings
In this project you will find how to:

-   Fetch Data within a React App
-   Use react-router-dom
-   Use Firebase/Firestore

This e-shop website should have four pages:

-   All products are stored in Firestore:
    -   Firestore contains the following information:
        -   quantity  (Different for different sizes)
        -   variants (sizes)
        -   price per unit
        -   name
        -   image url
        -   favourited or not (boolean)
            All data is stored in Firestore and fetched by the frontend, there is NO static product data in the react application.
-   Home Page
    -   This will contain:
        -   A Grid of products
        -   Carousel of featured products
        -   Product Page (with id parameter) Similar to a product page on another site, allows you to add to cart and select product variants

-   Products Page
    -   This will Contain: 
        -   The products of the e-Shop app.
        -   When Clicked on a product, we can add, Favorite the product and the stock is displayed on the screen.
        -   When Clicked on the favorites the product will be shown in the Favorites Page.
        -   If there is enough stock the product can be added to Cart which is shown in the Cart Page.
        -   Each time there is addition or deletion for the product the stock Changes accordingly.
        -   If there is no Stock, prevent users from adding items to cart.
        -   If the product is already added, it increases the quantity in Cart but won't add it again.
    
-   Favorites Page
     -   This will Contain: 
        -   The Product Favorited is shown in this page. 
        -   If the product is removed as Favorite then the page deletes the product from this page.
    
-   Cart Page
    -   This will Contain: 
        -   The ability to change quantity of products in cart.
        -   The ability to remove items from cart.
