import React, { useEffect, useState } from "react";
import "./style/chooseModifier.scss";

const ChooseModifers = (props) => {
    const [modifiers, setModifiers] = useState([]);
    console.log(modifiers);

    useEffect(() => {
        setModifiers(props.itm?.modifiers);
    }, [props.itm])

    const updateModifier = (index, key, value) => {
        console.log(index, key, value);
        setModifiers(fl => {
            fl[index][key] = value;
            return [...fl];    
        });
                
    };
    if(!props.itm?.modifiers.length){
        return "No modifiers"
    }
    return (
    <div class="row justify-content-center">
      <div class="col-12 py-5 px-4 choose-modifiers-container">
        {modifiers.map((itm,index) => (
            <div class="row d-flex justify-content-space-between mb-4">
                <div class="form-check col-8">
                    <input
                        class="form-check-input-1"
                        type="checkbox"
                        checked={itm.status}
                        id={itm.name}
                        onChange={(e) => updateModifier(index, "status", e.target.checked)}
                    />
                    <label class="form-check-label-1" for={itm.name}>
                    {itm.name}
                    </label>
                </div>
                <div class="col-1"></div>
                <div class="col-2 px-2 text-center">
                    <div class="price py-2">
                    <input type="number" value={itm.price} style={{ width:38, border: "none"}} onChange={(e) => updateModifier(index, "price", e.target.value)} />    
                    </div>
                </div>
                </div>

        ))}    
        
        <div class="form-group d-flex justify-content-start">
          <button type="button" class="btn choose-modifiers-btn" onClick={() => props.handleSubmit({...props.itm, modifiers: modifiers})}>
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseModifers;
