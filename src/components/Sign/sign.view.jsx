import React from 'react';

const SignView = ({ isSubmited, onSubmit, onChange, keyString, onClear }) => {
  return (
    // <div>
    //   <div class="py-5">
    //     <form action="/">
    //         Key: <input type="text" value={keyString} onChange={onChange} disabled={isSubmited}/><br/>

    //         <button type="button" onClick={onSubmit} disabled={isSubmited}>Submit</button>
    //     </form>
    //   </div>
    // </div>

    <div class="container form-group">
      <label for="key">Key:</label>
      <input type="text" class="form-control col-4" id="key" value={keyString} onChange={onChange} disabled={isSubmited} />
      <br />
      {isSubmited ? <button type="button" class="btn btn-kprimary" onClick={onClear}>Clear</button>
      : <button type="button" class="btn btn-kprimary" onClick={onSubmit}>Submit</button>
      }
    </div>
  );
}

export default SignView;