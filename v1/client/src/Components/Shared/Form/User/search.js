import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FetchProducts } from '../../../../Redux/Actions';

const SearchForm = () => {

    const [value, setValue] = useState("");

	const [filteredData, setFilteredData] = useState({
		filters: {
			title: '',
			category: '',
			subs:[],
			color:[],
			brand:'',
			stock: '',
			createdDate:[]
		}
	})

	const dispatch = useDispatch()
	const { product } = useSelector(state => state)
	const products = product.getProducts;

    useEffect(() => {
		let isMounted = true
		if(isMounted) {
			loadProducts(filteredData.filters);
		}
		// cleanup
		return () => { isMounted = false }
	},[dispatch])

	const loadProducts = (currentFilters) => {
		dispatch(FetchProducts(currentFilters))
	}
    

    const onChange = (event) => {
        setValue(event.target.value);
    };
    
    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        console.log("search ", searchTerm);
    };

    return (
        <div className="search-container">
            <div id='searchForm'>
                <input
                    id='searchInput'
                    type='text'
                    placeholder='Search...'
                    value={value} 
                    onChange={onChange}
                />
                <button type='submit' id='searchButton'>
                    search
                </button>
            </div>
            <div className="dropdownSearch">
                {products
                .filter((product) => {
                    const searchTerm = value.toLowerCase();
                    const productName = product.title.toLowerCase();
                    console.log(searchTerm);
                    return ( 
                        searchTerm && productName.startsWith(searchTerm) && productName !== searchTerm
                     );
                })
                .slice(0,10)
                .map((product) =>
                    <div
                        onClick={() => onSearch(product.title)}
                        className="dropdownSearch-row"
                        key={product._id}
                    >
                        <img id='cartImg' src={product.images[0].url} alt='cart product'/>
                        <span id="searchTxt">{product.title}</span>
                        <span id="searchPrice">BDT {product.mrp_price}tk</span>
                    </div>
                )}
            </div>
        </div>
        
    )
}

export default SearchForm;