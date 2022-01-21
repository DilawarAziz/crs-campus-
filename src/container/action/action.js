const foo = (data) => {
  // console.log(data)
  return (dispatch) => {
    dispatch({
      type: "SETDATA",
     useruid:data ,
    });
  };
};
const Getimageurl = (a) => {
  console.log(a)
  return (dispatch) => {
    dispatch({
      type: "SETDATA",
    //  user:user ,
    //  bool:bool
    });
  };
};

export {foo ,Getimageurl}