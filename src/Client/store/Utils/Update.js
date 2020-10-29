export const UpdateState = (field,updateState,value) => {
   updateState(prevState => {
       return {
           ...prevState,
           [field]: value
       }
   })
}