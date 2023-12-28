// Filename - ImageSlider.js

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import style from './style.module.css'

// Filename - images.js

// Replace src value with ypur image url
const images = [
	{
		id: 1,
		src: "https://static.vecteezy.com/system/resources/previews/001/776/835/non_2x/online-shopping-and-e-commerce-banner-vector.jpg",
		alt: "Image 1",
	},
	{
		id: 2,
		src: "https://img.freepik.com/free-vector/ecommerce-web-page-concept-illustration_114360-8204.jpg?w=2000",
		alt: "Image 2 ",
	},
	{
		id: 3,
		src: "https://www.zilliondesigns.com/blog/wp-content/uploads/Perfect-Ecommerce-Sales-Banner.jpg",
		alt: "Image 3",
	},
	{
		id: 4,
		src: "https://previews.123rf.com/images/varijanta/varijanta1601/varijanta160100046/51310252-thin-line-flat-design-banner-of-online-shopping-e-commerce-m-commerce-modern-vector-illustration.jpg",
		alt: "Image 3",
	},
];


const ImageSlider = () => {
	const settings = {
		infinite: true,
		dots: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		lazyLoad: true,
		autoplay: true,
		autoplaySpeed: 2000,
	};
	return (
		<>
			<div className={style.imageSlider}>
				<Slider {...settings}>
					{images.map((item) => (
						<div key={item.id} className={style.imgBx}>
							<img
								src={item.src}
								alt={item.alt}
                                className={style.image}
							/>
						</div>
					))}
				</Slider>
			</div>
		</>
	);
};
export default ImageSlider;
