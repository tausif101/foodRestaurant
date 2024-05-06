import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResults from "./componenets/SearchResults/SearchResults.jsx";


export const BASE_URL = "http://localhost:9000";

const App = () => {


  const [data, setData] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBtn, setSelectedBtn] = useState("all");

    

  useEffect(() => {
    const FoodData = async () => {
      try {
        
        const response = await fetch(BASE_URL);
        const finalData = await response.json();

        setData(finalData);
        setFilteredData(finalData);
        setLoading(false);

      } catch (error) {
        setError(error.message)
      }
    }
    FoodData();
  },[])
  
  const searchFood= (e) =>{
    const searchValue = e.target.value;
    console.log(searchValue);

    if (searchValue === '') {
      setFilteredData(null);
    }

    const filter = data?.filter((food) => 
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredData(filter)
  }
  

  const filterFood = (type) => {
    if (type === "all") {
      setFilteredData(data);
      setSelectedBtn("all");
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: "all",
      type: "all",
    },
    {
      name: "Breakfast",
      type: "breakfast",
    },
    {
      name: "Lunch",
      type: "lunch",
    },
    {
      name: "Dinner",
      type: "dinner",
    },
  ];






  if (error) {
    return (<div>{error}</div>);
  }

  if (loading) {
    return(<div>Loading...</div>)
  }

  return (
  <>
    <Container>
      <TopContainer>
        <div className='logo'>
          <img src="/images/logo.svg" alt="Logo" />  
          </div>
          <FilterBtnContainer>
            {filterBtns.map((value) => (
              <Button
                isSelected={selectedBtn === value.type}
                key={value.name}
                onClick={() => filterFood(value.type)}
              >
                {value.name}
              </Button>
            ))}
          </FilterBtnContainer>
        <div className="search">
            <input onChange={searchFood} type="text" placeholder='Search Food...' />
        </div>
      </TopContainer>
      </Container>
      <SearchResults data={filteredData} />
    
  </>
  )

};

export default App;

const Container = styled.div`
  max-width:1200px;
  margin: 0 auto;
`;
const TopContainer = styled.section`
  min-height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  align-items: center;
  flex-wrap:wrap;
  gap:25px;


  .search{
    input{
      background-color: transparent;
      border: 1px solid blueviolet;
      color: white;
      border-radius: 5px;
      height: 40px;
      font-size: 16px;
      padding:0 10px;
    
    &::placeholder{
      color:white;
    }
    
    }
  }
`;


const FilterBtnContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px; 




`
export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? "#662d91" : "blueviolet")};

  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  
  cursor :pointer;

 &:hover{
  background-color: whitesmoke;
  color: black;
 }

`

