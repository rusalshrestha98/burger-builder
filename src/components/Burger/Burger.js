import React from 'react';
import classes from './Burger.css'
import BurgerIngredient from './BurgerIngredients/BurgerIngredients'

const burger = (props) => {
    let arrayofIngredients = Object.keys(props.ingredients).map(igKey => {
        return  [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey} />
        });
    })
    .reduce((arr, el) => {
        return arr.concat(el)
    }, [])
    if (arrayofIngredients.length === 0) {
        arrayofIngredients = <p>Please start adding ingredients</p>
    }
    console.log(arrayofIngredients)

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {arrayofIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}
export default burger;