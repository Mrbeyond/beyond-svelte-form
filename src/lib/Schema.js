

/** The form parameters for simple signup 
 * which has email, fullname and password
 * className used here must be a class written in the parent component
 */
 export default [
  {
    type:'email',
    errorMessage:'Valid email is required',
    holder: 'Enter your email',
    label: 'Email',
    style: '',
    value:'',
    invalid: false,
    checked: false,
    name: 'email',
    labelClass:'text-indigo-900 font-semibold',
    boxContainerClass:'border',
    iconData: {
      iconType:'email',
      stroke:'#061340',
      bg:'bg-white',
    }
    // className: 'auth',
  },
  {
    type:'text',
    errorMessage:'Fullname is required',
    holder: 'Enter your Fullname',
    label: 'Fullname',
    style: '',
    regex: /[a-zA-Z]{2,}/,
    value:'',
    invalid: false,
    checked: false,
    name: 'fullname',
    labelClass:'text-indigo-900 font-semibold',
    boxContainerClass:'border',
    iconData: {
      iconType:'user',
      stroke:'#061340',
      bg:'bg-white',
    }
    // className: 'auth',
  },
  {
    type:'password',
    errorMessage:'Password should contain minimum of 8 alphanumeric or an underscore',
    holder: 'Enter your password',
    label: 'Password',
    regex: /[a-zA-Z0-9_]{8,}/,
    style: '',
    value:'',
    invalid: false,
    checked: false,
    labelClass:'text-indigo-900 font-semibold',
    boxContainerClass:'border',
    name: 'password',
    iconData: {
      iconType:'up-lock',
      stroke:'#061340',
      bg:'bg-white',
    },
    // className: 'auths',
  },
]