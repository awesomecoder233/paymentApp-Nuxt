export default function ({ store, redirect }) {
  console.log(store.state.auth.loggedIn); // here returns false, even after success login
  if (store.state.auth.loggedIn) {
    return redirect('/home')
  }
}