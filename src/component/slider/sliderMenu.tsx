import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const images = [
    'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    'https://os.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    'https://os.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    'https://os.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
    'https://os.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
];

interface horizontalMenuSliderProps {
    listData?: any[]
}

const HorizontalMenuSlider: React.FC<horizontalMenuSliderProps> = ({ listData }) => {
    const sliderRef = useRef<HTMLDivElement>(null);

    const handleNext = () => {
        if (sliderRef.current) {
            const { scrollWidth, clientWidth, scrollLeft } = sliderRef.current;
            if (scrollLeft + clientWidth >= scrollWidth - 1) {
                sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                sliderRef.current.scrollBy({ left: clientWidth, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <div
                ref={sliderRef}
                className="flex overflow-x-auto h-screen space-x-4 p-4 custom-scrollbar-hide items-center"
                style={{
                    scrollSnapType: "x mandatory",
                    scrollPadding: "1rem",
                    maxWidth: "calc(16rem * 4 + 3rem)",
                }}
            >
                {listData?.map((item: any, index: number) => (
                    <React.Fragment key={index}>
                        <div
                            key={index}
                            className="flex-shrink-0 w-64 scroll-snap-align-start"
                            style={{ scrollSnapAlign: 'start' }}
                        >
                            <img
                                src={`https://loremflickr.com/400/400/anime?lock=${index}`}
                                alt={`Slide ${index}`}
                                key={index}
                                className="h-80 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default HorizontalMenuSlider;