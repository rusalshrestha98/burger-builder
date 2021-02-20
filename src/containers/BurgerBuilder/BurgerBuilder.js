import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'

// declaring object for the ingredient prices of each item
// name global constants in all caps
const INGREDIENT_PRICES = {
    salad: 0.5, 
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: { // number of ingredients used
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4 // base price of the burger
    }

    // when the user adds an ingredient
    addIngredientHandler = (type) => {
        // get the current ingredient count from the 'type' arg that is passed in
        const oldCount = this.state.ingredients[type];
        // update the count 
        const updatedCount = oldCount + 1;
        // create a new object with the spread operator with the updated count
        const updatedIngredients = {
            ...this.state.ingredients
        };
        // save the updated count of the ingredient in the new object
        updatedIngredients[type] = updatedCount;
        // update the total price with the ingredient prices added
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        // update the state
        this.setState({
            totalPrice: newPrice, 
            ingredients: updatedIngredients
        });
    };

    removeIngredientHandler = (type) => {

    };

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                />
            </Aux>
        )
    };
};

export default BurgerBuilder;