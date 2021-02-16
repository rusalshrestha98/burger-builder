import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
    const arrayofIngredients = Object.keys(props.ingredients).map(igKey => {
        return  [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    });

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {arrayofIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}
export default burger;