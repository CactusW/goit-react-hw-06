1. Install @reduxjs/toolkit + react-redux
2. Instal devTools (один раз на все життя)
3. Create redux folder
4. Create file store.js 
5. In file store.js create store

```
export const store = configureStore({
  reducer: {
    <!-- counter: counterReducer, -->
  },
});
```
6. Create folder фічі(auth, products, contacts, counter)
7. In the folder фічі create the base set
   1. reducer.js
   2. selectors.js
   3. actions.js
8. Go to the reducer.js and set it 

```
const initialState = {
    counter: 0,
    step: 1,
};

export const counterReducer = (state = initialState, action) => {
      return state;
};
```
9. Підключаємо редюсер в стор

```
export const store = configureStore({
  reducer: {
    counter: counterReducer, 
  },
});
```

10. Підключити redux до UI. Ідемо в main.js огортаємо компонент App в <Provider store={store}>
    <App /> </Provider> і передаємо створений стор
11. Ми можемо побачити наш redux в девтулз
12. В компоненті виуористовуємо селектори для отримання данних в редакс
13. Для цього в файлі selectors.js строрюємо потрібний селектор

```
export const increment = createAction("inrement"); //цій конст інкремент буде повертатися функцією
export const decrement = createAction("decrement");
```
14. підключаємо useDispatch для передачі команд (екшенів) до редакса
15. створюємо в файлі actions.js перші екшини

```
 export const increment = createAction("inrement"); //цій конст інкремент буде повертатися функцією
export const decrement = createAction("decrement");
```
16. Викликаємо потрібний екшин по події (клік, сабміт, чендж, )
```
  const dispatch = useDispatch();
    const handleAddContactClick = () => {
    dispatch(increment()); //if you would like to do increase, then go to "reducer" and do it
  };
  ```
  17. В редюсер жс ловимо екшин і опрацьовуємо його
    ```
  export const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case increment.type: //якщо приїде якась машина інкремент, то ми маємо зробити якусь подію
      return {
        ...state,
        counter: state.counter + state.step,
      }; //! ми кожного разу повині повертати новий стейт
      };
    default:
      return state; // обовязково має повертати по дефолту стан
  }
};  
      ```
  17. Дивимось логи в девтулзах