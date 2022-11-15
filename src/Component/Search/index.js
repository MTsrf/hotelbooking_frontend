import React from 'react'
import { Input } from '../syledcomponent/StyledComponent';

const SearchBar = ({ searched, data, setList, setSearched, table }) => {
    const requestSearch = (e) => {
        setSearched(e.target.value)
        const filteredRows = data?.filter((row) => {
            return (table == "booking" ? row.property.property_name.toLowerCase().includes(searched.toLowerCase()) : table == "user" ?
                row.name.toLowerCase().includes(searched.toLocaleLowerCase()) : null);
        });
        setList(filteredRows);
    };
    return (
        <>
            <Input className='bar'
                value={searched}
                placeholder="Search"
                onChange={requestSearch}
            />
        </>
    )
}

export default SearchBar
