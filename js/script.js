$(document).ready(function(){
    
    $(".quantity").on("click", updateItemTotal);
    $(".shipping").on("click", addShippingCost);
    
    $("#submit-btn").click(function(e){
        
        if(!checkInput()){
            e.preventDefault();
        }
    });
    
    /*
        When quantity is changed on an item, update its total,
        the subtotal of the cart and the total including shipping
    */
    function updateItemTotal(){
        let quantity = $(this).val(); // Get the item quantity
        let item = $(this).attr("id"); // Get the item selected
        let total;
        
        // Find which item was updated
        if(item == "item1"){
            total = quantity * 24.99;
            $("#total1").html(`${total}`);
        } 
        else if(item == "item2"){
            total = quantity * 10.00;
            $("#total2").html(`${total}`);
        } 
        else if(item == "item3"){
            total = quantity * 24.99;
            $("#total3").html(`${total}`);
        }
        
        updateSubtotal();
        addShippingCost();
    }
    
    /*
        Add all item totals together to get the subtotal
    */
    function updateSubtotal(){
        let subtotal = 0;
        
        // Loop through the items in the cart, adding up their totals
        for(let i = 1; i < 4; i++){
            subtotal += parseFloat($(`#total${i}`).text());
        }
        
        subtotal = subtotal.toFixed(2); // Set to 2 decimal places
        $("#subtotal").html(`${subtotal}`);
    }
    
    /*
        Get the shipping cost and add it to the cart Total
    */
    function addShippingCost(){
        let total = parseFloat($("#subtotal").text());
        // Get the checked shipping radio box
        let shippingMethod = $("input[name='shipping']:checked").val();
        
        // Add slow or fast shipping cost to Total 
        if(shippingMethod == "slow"){
            total += 5.99;
        } else if (shippingMethod == "fast"){
            total += 12.99;
        } 
        
        total = total.toFixed(2); // Set to 2 decimal places
        $("#total").html(`\$${total}`);
    }
    
    /*
        Check that the user has items in their cart and chose a shipping method
    */
    function checkInput(){
        let total = $("#subtotal").text();
        // Find out if shipping method has been selected
        let shipping = $("input[name='shipping']:checked").val();
        let userval = $("#username").val();
        
        
        
        if($("#username").val() == "" || $("#user-pw").val() == ""){
            console.log("in if statement");
            $("#error-msg").html("Please enter your username and password");
            return false;
        }
        if(total == "0.00"){
            $("#error-msg").html("Please add items to your cart")
            return false;
        }
        else if(!shipping){
            $("#error-msg").html("Please select a shipping method")
            return false;
        }
        return true;
    }
})