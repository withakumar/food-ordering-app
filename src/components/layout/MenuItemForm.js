import Plus from "@/components/icons/Plus";
import Trash from "@/components/icons/Trash";
import EditableImage from "@/components/layout/EditableImage";
import MenuItemPriceProps from "@/components/layout/MenuItemPriceProps";
import {useEffect, useState} from "react";

export default function MenuItemForm({onSubmit,menuItem}) {
  const [image, setImage] = useState(menuItem?.image || '');
  const [name, setName] = useState(menuItem?.name || '');
  const [description, setDescription] = useState(menuItem?.description || '');
  const [basePrice, setBasePrice] = useState(menuItem?.basePrice || '');
  const [sizes, setSizes] = useState(menuItem?.sizes || []);
  const [category, setCategory] = useState(menuItem?.category || '');
  const [categories, setCategories] = useState([]);
  const [
    extraIngredientPrices,
    setExtraIngredientPrices,
  ] = useState(menuItem?.extraIngredientPrices || []);

  useEffect(() => {
    fetch('/api/category').then(res => {
      res.json().then(categories => {
       // console.log(categories);
        setCategories(categories);
      });
    });
  }, []);

  return (
    <form
      onSubmit={ev =>
        onSubmit(ev, {
          image,name,description,basePrice,sizes,extraIngredientPrices,category,
        })
      }
      className="mt-8 max-w-2xl mx-auto">
      <div
        className="md:grid items-start gap-4"
        style={{gridTemplateColumns:'.2fr .8fr'}}>
        <div>
          <EditableImage link={image} setLink={setImage} className="text-sm" />
        </div>
        <div className="grow ">
          <label>Item name</label>
          <input
            type="text"
            value={name}
            onChange={ev => setName(ev.target.value)}
            style={{margin:0}}
          />
          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            style={{margin:0}}
          />
          <label>Category </label>
          <select value={category} onChange={ev => setCategory(ev.target.value)} className="text-sm border mb-1 mt-1 text-gray-500" >
            {categories?.length > 0 && categories.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
          <label> Base price</label>
          <input
            type="text"
            value={basePrice}
            onChange={ev => setBasePrice(ev.target.value)}
            style={{margin:0}}
          />
          <MenuItemPriceProps name={'Sizes'}
                              addLabel={'Add item size'}
                              props={sizes}
                              setProps={setSizes} />
          <MenuItemPriceProps name={'Extra ingredients'}
                              addLabel={'Add ingredients prices'}
                              props={extraIngredientPrices}
                              setProps={setExtraIngredientPrices}/>
          <button type="submit">Save</button>
        </div>
      </div>
    </form>
  );
}