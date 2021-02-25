import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

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
        totalPrice: 4, // base price of the burger
        purchasable: false, 
        purchasing: false
    }
    
    // if total number of ingredients is greater than 0, set the 'purchaesable' state to true
    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0});
    };

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
        this.updatePurchaseState(updatedIngredients);
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
        this.updatePurchaseState(updatedIngredients);
    };

    // will be triggered whenever the user clicks the order button
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    // will be triggered whenever the user clicks on the backdrop (outside the modal)
    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    render() {
        // for disabling the "Less" button so there are no negative number of ingredients
        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                />
            </React.Fragment>
        )
    };
};

export default BurgerBuilder;