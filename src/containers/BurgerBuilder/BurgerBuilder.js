import React, { Component } from 'react';
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
            salad: 1,
            bacon: 1,
            cheese: 1,
            meat: 1
        },
        totalPrice: 4 // base price of the burger
    }

    // when the user adds an ingredient in the build control
    addIngredientHandler = (type) => {
        // get the current ingredient count from the 'type' arg that is passed in
        const oldCount = this.state.ingredients[type];
        // update the count 
        const updatedCount = oldCount + 1;
        // create a new object with the spread operator from the old state
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

    // when the user removes an ingredient in the build control
    removeIngredientHandler = (type) => {
        // get the current ingredient count from the 'type' arg that is passed in
        const oldCount = this.state.ingredients[type];
        // so that the ingredient count cannot fall below zero
        if (oldCount <= 0) {
            return;
        }
        // update the count 
        const updatedCount = oldCount - 1;
        // create a new object with the spread operator from the old state
        const updatedIngredients = {
            ...this.state.ingredients
        };
        // save the updated count of the ingredient in the new object
        updatedIngredients[type] = updatedCount;
        // update the total price with the ingredient prices added
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        // update the state
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
    };

    render() {
        // copy the ingredient state object into new object
        const disabledInfo = {
            ...this.state.ingredients
        }
        // set each ingredient property to true if it is less/equal to zero
        // { salad: true, meat: false, ...}
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo <= 0
        }
        return (
            <React.Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                />
            </React.Fragment>
        )
    };
};

export default BurgerBuilder;