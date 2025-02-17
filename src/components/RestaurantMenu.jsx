import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import { useDispatch } from 'react-redux';
import { addItem } from '../store/cartSlice';

const RestaurantMenu = () => {
    const [data, setData] = useState([])
    const [itemList, setitemList] = useState([]);

    const { resId } = useParams();
    const resInfo = data?.data?.cards[2]?.card?.card?.info;

    // const resInfomation = useRestaurantMenu(resId)

    // console.log(resInfomation);
    // console.log(resInfo)


    const fetcData = async () => {
        const data = await fetch(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=18.61610&lng=73.72860&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`);

        let res = await data.json();

        const itemArray = res?.data?.cards[4].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.itemCards.slice(0, 12)
        console.log(itemArray, 'cateogry')
        setitemList(itemArray);
        setData(res);
    }
    useEffect(() => {
        fetcData()
    }, []);

    const dispatch = useDispatch();

    const handleAddItem = (item) => {
        dispatch(addItem(item))
    }

    if (!resInfo) {
        return <h1>Loading...........</h1>
    }

    return (
        <div className='menu'>
            <div className='img-container'>

                <img className='res-logo' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${resInfo?.cloudinaryImageId
                    }`} />
            </div>

            <div className='info-container'>
                <h1>Welcome to ${resInfo?.name}</h1>
                <h4>Rating {resInfo?.avgRating
                }</h4>
                <h4>Cost for two {resInfo?.costForTwo / 100
                }</h4>
            </div>
            <div className='recomandaed container'>

                {
                    itemList.map((item) => {
                        return (

                            <div className='card'>
                                <div className='left-section'>

                                    <h6>{item?.card?.info?.name}</h6>
                                    <h5>price - {item?.card?.info?.price ?? item?.card?.info?.defaultPrice}</h5>
                                    <p>{item?.card?.info.description}</p>
                                </div>

                                <div className="right-section">
                                    <img className='res-logo' src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item?.card?.info?.imageId}`} />
                                    <button onClick={() => handleAddItem(item)}>Add</button>
                                </div>

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default RestaurantMenu
