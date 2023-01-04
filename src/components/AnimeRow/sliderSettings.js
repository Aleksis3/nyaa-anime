export default function sliderSettings(animeList) {
  return {
    dots: false,
    infinite: true,
    speed: 500,
    ...(animeList?.length < 5
      ? { slidesToShow: animeList?.length }
      : { slidesToShow: 5 }),
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 650,
        settings: {
          ...(animeList?.length < 4
            ? { slidesToShow: animeList?.length }
            : { slidesToShow: 4 }),
          slidesToScroll: 4,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          ...(animeList?.length < 3
            ? { slidesToShow: animeList?.length }
            : { slidesToShow: 3 }),
          slidesToScroll: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 410,
        settings: {
          ...(animeList?.length < 2
            ? { slidesToShow: animeList?.length }
            : { slidesToShow: 2 }),
          slidesToScroll: 2,
          arrows: false,
        },
      },
    ],
  };
}
