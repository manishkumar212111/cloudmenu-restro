import React, { Fragment, useEffect, useState } from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

const DragAndDrop = (props) => {
    const [ dragId , setDragId ] = useState(null);
    const [contents , setContents] = useState(props.htmlContent);

    useEffect(() => {
        setContents(props.htmlContent)
    }, [props.htmlContent])
    const handleDrag = (ev) => {
        console.log(ev.currentTarget.id)
        setDragId(ev.currentTarget.id);
        //setDragId(ev.currentTarget.id);
      };
    
      const handleDrop = ({oldIndex, newIndex}) => {
        if(newIndex == oldIndex){
            return;
        }
        
        let newItem = array_move(props.items , parseInt(oldIndex) , parseInt(newIndex))
        props.handleChange(newItem)
        
        //   let id = ev.changedTouches.item(0).target.id;
        //   window.temp = ev;
        //   console.log("drop", id, dragId)
        //     if(id == dragId){
        //         return;
        //     }
        
        //     let newItem = array_move(props.items , parseInt(dragId) , parseInt(id))
        //     props.handleChange(newItem)
        
      };

      const handleDropDesktop = (ev) => {
      if(ev.currentTarget.id == dragId){
          return;
      }
      
      let newItem = array_move(props.items , parseInt(dragId) , parseInt(ev.currentTarget.id))
      props.handleChange(newItem)
      
    };

      const drag = (ev) => {
        console.log("drag", ev.currentTarget)
      }
      const array_move = (arr, old_index, new_index) => {
        if (new_index >= arr.length) {
                var k = new_index - arr.length + 1;
                while (k--) {
                    arr.push(undefined);
                }
            }
            arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
            return arr; // for testing
        };
    
        const SortableItem = SortableElement(({value}) => <li className={props.className} style={{listStyle : 'none', zIndex: "999999999"}}>{value}</li>);

        const SortableList = SortableContainer(({items}) => {
        return (
            <ul>
                {contents.map((value, index) => (
                    <SortableItem key={`item-${value}`} index={index} value={value} />
                ))}
            </ul>
        );
        });
    return(
        <div>
            <SortableList transitionDuration={0} pressDelay={200} items={contents} onSortEnd={handleDrop} />
            {/* <SortableContainer 
            items={contents.map((itm, index) => (
                <SortableElement
                    draggable={true}
                    id={index}
                    // onTouchStart={handleDrag}
                    // onTouchMoveCapture={drag}
                    // onTouchEnd={handleDrop}
                    // onDragOver={(ev) => ev.preventDefault()}
                    // onDragStart={handleDrag}
                    // onDrop={handleDropDesktop}
                    className={props.className}
                    style={{listStyle : 'none'}}
                >
                    {itm}
                </SortableElement>
            ))} 
            onSortEnd={handleDrop} /> */}
            
        </div>
    )
}

export default DragAndDrop;