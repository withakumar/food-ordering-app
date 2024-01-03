import ChevronDown from "@/components/icons/ChevronDown";
import ChevronUp from "@/components/icons/ChevronUp";
import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import {useState} from "react";

export default function MenuItemPriceProps({name,addLabel,props,setProps}) {

  const [isOpen, setIsOpen] = useState(false);

  function addProp() {
    setProps(oldProps => {
      return [...oldProps, {name:'', price:0}];
    });
  }

  function editProp(ev, index, prop) {
    const newValue = ev.target.value;
    setProps(prevSizes => {
      const newSizes = [...prevSizes];
      newSizes[index][prop] = newValue;
      return newSizes;
    });
  }

  function removeProp(indexToRemove) {
    setProps(prev => prev.filter((v,index) => index !== indexToRemove));
  }

  return (
    <div className="bg-gray-200 p-2 rounded-md mt-2 mb-2 text-sm">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="inline-flex p-1 border-0 justify-start"
        type="button">
        {isOpen && (
          <ChevronUp className="w-4 h-4" />
        )}
        {!isOpen && (
          <ChevronDown className="w-4 h-4" />
        )}
        <span>{name}</span>
        <span>({props?.length})</span>
      </button>
      <div className={isOpen ? 'block' : 'hidden'}>
        {props?.length > 0 && props.map((size,index) => (
          <div key={index} className="flex items-end gap-2">
            <div>
              <label>Name</label>
              <input type="text"
                     placeholder="Size name"
                     value={size.name}
                     onChange={ev => editProp(ev, index, 'name')}
                     style={{margin:0}}
              />
            </div>
            <div>
              <label>Extra price</label>
              <input type="text" placeholder="Extra price"
                     value={size.price}
                     onChange={ev => editProp(ev, index, 'price')}
                     style={{margin:0}}
              />
            </div>
            <div>
              <button type="button"
                      onClick={() => removeProp(index)}
                      className="bg-white mb-0 px-2 ">
                <Trash className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addProp}
          className="bg-white items-center mt-2 flex">
          <Plus className="w-4 h-4" />
          <span>{addLabel}</span>
        </button>
      </div>
    </div>
  );
}