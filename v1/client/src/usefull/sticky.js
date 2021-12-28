import React, {useEffect} from "react";

const Sticky = (props) => {

	useEffect(() => {
		let header = document.getElementById("myHeader");
		let sticky = header.offsetTop;

		const myFunction = () =>  {
			if (window.pageYOffset > sticky) {
				header.classList.add("sticky");
			} else {
				header.classList.remove("sticky");
			}
		}

		window.onscroll = () => myFunction()

	})



	return (
			<div className='header_layout' id="myHeader">
				<h1>{props.title}</h1>
			</div>
	)
}

export default Sticky;