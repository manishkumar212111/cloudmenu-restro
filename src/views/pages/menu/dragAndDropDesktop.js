import React, { useEffect, useState } from 'react';

const DragAndDropDesktop = (props) => {
    console.log(props);
    const [ dragId , setDragId ] = useState(null);
    const [contents , setContents] = useState(props.htmlContent);

    useEffect(() => {
        setContents(props.htmlContent)
    }, [props.htmlContent])
    const handleDrag = (ev) => {
        setDragId(ev.currentTarget.id);
        //setDragId(ev.currentTarget.id);
    };

    const handleDrop = (ev) => {
        if (ev.currentTarget.id == dragId) {
            return;
        }
        
        let newItem = array_move(props.items , parseInt(dragId) , parseInt(ev.currentTarget.id))
        props.handleChange(newItem)
        
      };

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

    return (
        <>
            {contents.map((itm, index) => (
                <div
                    draggable={true}
                    id={index}
                    onDragOver={(ev) => ev.preventDefault()}
                    onDragStart={handleDrag}
                    onDrop={handleDrop}
                    className={props.className}
                    style={{ listStyle: 'none' }}
                >
                    {itm}
                </div>
            ))}
        </>
    )
}

export default DragAndDropDesktop;