import React, { useEffect, useState, useContext } from 'react'
import RestaurantCard, { withTopRatedLabel } from './RestaurantCard'
import { data } from '../utils/mockData'
import Shimmer from './Shimmer';
import { Link } from 'react-router-dom';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContextApi from '../utils/UserContext';
const Body = () => {
  const [dataList, setDataList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [input, setInput] = useState('');

  const {loggedInUser,setUserName} = useContext(UserContextApi)

  const handleTopRated = () => {
    const topData = data.filter((item) =>
      item.info.avgRating >= 4

    );
    setFilteredList(topData)
  }

  const handleReset = () => {
    setFilteredList(dataList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch('https://www.swiggy.com/dapi/restaurants/list/v5?lat=18.450386&lng=73.87937450000001&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING');

    const res = await data.json();
    const result = res?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
    setFilteredList(result)
    setDataList(result);
  }


  useEffect(() => {
    const debounce = setTimeout(() => {
      if (input) {
        const trimInput = input.trim().toLowerCase();
        const filterData = dataList.filter((item) =>
          item.info.name.toLowerCase().includes(trimInput)
        );
        setFilteredList(filterData);
      } else {
        setFilteredList(dataList);
      }
    }, 2000);

    return () => clearTimeout(debounce);
  }, [input, dataList]);


  if (input && filteredList.length === 0) {
    return <div>
      <h1>no result found</h1>
      <button onClick={() => setInput('')}>clear Search</button>
    </div>
  }

  const onlineStatus = useOnlineStatus();
  const RestaurantCardWithTopLabel = withTopRatedLabel(RestaurantCard)
  if (onlineStatus === false) {
    return <h1>you are offline please check internet connection</h1>
  }

  return (
    <div className='body'>
      <div className='filter' style={{
        display: 'flex',
        gap: '10px',
        alignItems: 'center'
      }}>
        <div className="input">
          <label>User Name: </label>
          <input type="text"
           onChange={(e)=>setUserName(e.target.value)}
           value={loggedInUser}
           />
        </div>
        <div style={{
          display: 'flex',
          gap: '10px',
          alignItems: 'center'
        }}>
          <button style={{
            padding: '8px',
            width: '100%',
            maxWidth: '300px',
            margin: '5px',
            marginBottom: '20px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            cursor: 'pointer'
          }} onClick={() => handleTopRated()}>Top Rated Restaurant</button>
          <button style={{
            padding: '8px',
            width: '100%',
            maxWidth: '200px',
            cursor: 'pointer',
            margin: '5px',
            marginBottom: '20px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }} onClick={() => handleReset()}>All Restaurant</button>
        </div>

        <div className='searchbar'>
          <input type='text' onChange={(e) => setInput(e.target.value)} placeholder='Enter hotel name' style={{
            padding: '8px',
            width: '100%',
            maxWidth: '300px',
            margin: '5px',
            marginBottom: '20px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }} />

        </div>
      </div>

      {
        filteredList.length > 0 ?
          <div className='res-container'>
            {
              filteredList.map((item) => {
                console.log(item)
                return (
                  <Link to={`/restaurants/${item.info.id}`} >
                    {
                      item.info.avgRating > 4.2 ? <RestaurantCardWithTopLabel
                        key={item.info.id}
                        img={item?.info?.cloudinaryImageId}
                        resName={item.info.name}
                        cuisines={item.info.cuisines.join(',')}
                        rating={item.info.avgRating}
                        time={item.info.sla.slaString}
                        price={item.info.costForTwo}

                      /> :
                        <RestaurantCard
                          key={item.info.id}
                          img={item?.info?.cloudinaryImageId}
                          resName={item.info.name}
                          cuisines={item.info.cuisines.join(',')}
                          rating={item.info.avgRating}
                          time={item.info.sla.slaString}
                          price={item.info.costForTwo}

                        />
                    }
                  </Link>
                )
              })
            }
          </div>
          :
          <Shimmer />
      }
    </div>
  )
}

export default Body
