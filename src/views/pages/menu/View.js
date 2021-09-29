import { CImg } from '@coreui/react';
import React from 'react';
import { BASE_URL } from 'src/API/config';

const View = ({item}) => {
    
    return(<div>
        <CImg src={BASE_URL + item.imageUrl} width="60" height="60"/><br></br>
        <span>Title: {item.title}</span><br></br>
        <span>Title Arabic: {item.titleAr}</span><br></br>

        <span>Description: {item.description}</span><br></br>
        <span>Description Arabic: {item.descriptionAr}</span><br></br>

        <span>Selling Price: {item.price}</span><br></br>
        <span>Selling Price Arabic: {item.price}</span><br></br>

        <span>Category: {item?.category.name}</span>
    </div>)
}

export default View;