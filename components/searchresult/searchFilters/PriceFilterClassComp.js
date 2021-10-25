import React, { Component } from 'react'
import uistring from '../../../data/uistring.json'
import FilterButton from './searchFiltersWidget/FilterButton'
import { useState, useRef, useEffect } from 'react'
import ClearSavePane from './searchFiltersWidget/ClearSavePane'
import { IoReorderThreeSharp } from "react-icons/io5";
import { connect } from 'react-redux';


function PriceInputField({ title, minPrice, onChange, onBlur }) {
    return (
        <div className="relative cursor-text flex h-14 w-full text-textColor-extraHeavy
                                    bg-white rounded-lg border-border-dark border text-base font-normal">
            <label className="relative">
                <div className="absolute top-[18px] left-[12px] right-[12px] text-textColor-light
                                            origin-0 transition-all -translate-y-2 scale-75">
                    <div className="w-full overflow-hidden overflow-ellipsis">
                        {title}
                    </div>
                </div>

                <div className="flex">
                    <div className="pt-[26px] pl-3 mr-[-6px]">
                        <span>{uistring.searchFilters.rupeeSymbol}</span>
                    </div>
                    <input type="text" className="w-full mt-[26px] mx-3 mb-[10px]
                                                min-h-[1px] appearance-none outline-none" value={minPrice} onChange={onChange} onBlur={onBlur} />
                </div>
            </label>
        </div>
    )
}

export class PriceFilterClassComp extends Component {

    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            isDragging: false,
            leftButtonPosition: 0,
            originalLeftButtonPosition: 0,
            lastLeftButtonPosition: 0,
            rightButtonPosition: 100,
            originalRightButtonPosition: 100,
            lastRightButtonPosition: 100,
            sliderWidth: 360,           // This is default width, we will update it on mouse down event
            minPrice: 500,
            initialMinPrice: 500,
            productMinPrice: 500,       // It is price coming from server
            maxPrice: 100000,
            initialMaxPrice: 100000,
            productMaxPrice: 100000,      // Coming from server
            averagePrice: 1000,
            showFilterPopup: false,
            abc: props.minPrice
        };
        this.handleMouseUpLeft = this.handleMouseUpLeft.bind(this);
        this.handleMouseMoveLeft = this.handleMouseMoveLeft.bind(this);
        this.handleMouseUpRight = this.handleMouseUpRight.bind(this);
        this.handleMouseMoveRight = this.handleMouseMoveRight.bind(this);
        this.clearButtonClicked = this.clearButtonClicked.bind(this);
        this.saveButtonClicked = this.saveButtonClicked.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.onMinPriceChange = this.onMinPriceChange.bind(this);
        this.onMaxPriceChange = this.onMaxPriceChange.bind(this);
        this.onBlurMin = this.onBlurMin.bind(this);
        this.onBlurMax = this.onBlurMax.bind(this);




        this.filterPopupRef = React.createRef();
        this.filterButtonRef = React.createRef();
        this.sliderRef = React.createRef();


    }

    // Handling for popup open and close
    handleClickOutside = (event) => {
        if ((this.filterPopupRef.current && !this.filterPopupRef.current.contains(event.target)) &&
            (this.filterButtonRef.current && !this.filterButtonRef.current.contains(event.target))) {
            this.setState({
                ...this.state,
                leftButtonPosition: 0,
                rightButtonPosition: 100,
                minPrice: this.state.initialMinPrice,
                maxPrice: this.state.initialMaxPrice,
                showFilterPopup: false
            })
        }
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleMouseUpLeft = (e) => {
        window.removeEventListener('mousemove', this.handleMouseMoveLeft);
        window.removeEventListener('mouseup', this.handleMouseUpLeft);
        this.setState({
            ...this.state,
            isDragging: false,
            lastLeftButtonPosition: this.state.leftButtonPosition
        })

    }

    handleMouseMoveLeft = ({ clientX, clientY }) => {
        if (this.state.isDragging) {
            console.log("isdragging")
            let newLeft = this.state.lastLeftButtonPosition + (((clientX - this.state.originalLeftButtonPosition) / this.state.sliderWidth) * 100);
            if (newLeft >= 0 && newLeft < this.state.rightButtonPosition) {
                let newMinPrice = Math.round(this.state.initialMinPrice + ((this.state.initialMaxPrice - this.state.initialMinPrice) / 100 * newLeft));
                this.setState({
                    ...this.state,
                    leftButtonPosition: newLeft,
                    minPrice: newMinPrice
                })
            }
        }

    }

    onMouseDownLeft = ({ clientX, clientY }) => {
        let newSliderWidth = this.state.sliderWidth;
        if (this.sliderRef.current)
            newSliderWidth = this.sliderRef.current.clientWidth;

        this.setState({
            ...this.state,
            isDragging: true,
            originalLeftButtonPosition: clientX,
            lastLeftButtonPosition: this.state.leftButtonPosition,
            sliderWidth: newSliderWidth
        }, () => {

            window.addEventListener('mousemove', this.handleMouseMoveLeft);
            window.addEventListener('mouseup', this.handleMouseUpLeft);
        })
    }

    handleMouseUpRight = (e) => {
        window.removeEventListener('mousemove', this.handleMouseMoveRight);
        window.removeEventListener('mouseup', this.handleMouseUpRight);
        this.setState({
            ...this.state,
            isDragging: false,
            lastRightButtonPosition: this.state.rightButtonPosition
        })

    }

    handleMouseMoveRight = ({ clientX, clientY }) => {
        if (this.state.isDragging) {
            let newRight = this.state.lastRightButtonPosition - (((this.state.originalRightButtonPosition - clientX) / this.state.sliderWidth) * 100);
            if (newRight <= 100 && newRight > this.state.leftButtonPosition) {
                let newMaxPrice = Math.round(this.state.initialMinPrice + ((this.state.initialMaxPrice - this.state.initialMinPrice) / 100 * newRight));
                this.setState({
                    ...this.state,
                    rightButtonPosition: newRight,
                    maxPrice: newMaxPrice
                })
            }
        }

    }

    onMouseDownRight = ({ clientX, clientY }) => {
        console.log("mouse down " + clientX)
        let newSliderWidth = this.state.sliderWidth;
        if (this.sliderRef.current)
            newSliderWidth = this.sliderRef.current.clientWidth;

        this.setState({
            ...this.state,
            isDragging: true,
            originalRightButtonPosition: clientX,
            lastRightButtonPosition: this.state.rightButtonPosition,
            sliderWidth: newSliderWidth
        }, () => {

            window.addEventListener('mousemove', this.handleMouseMoveRight);
            window.addEventListener('mouseup', this.handleMouseUpRight);
        })
    }

    onMinPriceChange = (e) => {
        let newMinPrice = e.target.value;
        if (this.state.initialMaxPrice != this.state.initialMinPrice) {
            let newLeftPosition = (newMinPrice / (this.state.initialMaxPrice - this.state.initialMinPrice)) * 100;
            if (newLeftPosition >= 0 && newLeftPosition <= this.state.rightButtonPosition) {
                this.setState({
                    ...this.state,
                    minPrice: newMinPrice,
                    leftButtonPosition: newLeftPosition
                })
            }
        }
    }

    onMaxPriceChange = (e) => {
        let newMaxPrice = e.target.value;
        if (this.state.initialMaxPrice != this.state.initialMinPrice) {
            let newRightPosition = (newMaxPrice / (this.state.initialMaxPrice - this.state.initialMinPrice)) * 100;
            if (newRightPosition <= 100 && newRightPosition > this.state.leftButtonPosition) {
                this.setState({
                    ...this.state,
                    maxPrice: newMaxPrice,
                    rightButtonPosition: newRightPosition
                })
            }
        }
    }

    onBlurMin = (e) => {
        if (this.state.minPrice < this.state.initialMinPrice || this.state.minPrice < this.state.maxPrice) {
            this.setState({
                ...this.state,
                minPrice: this.state.initialMinPrice,
                leftButtonPosition: this.state.lastLeftButtonPosition
            })
        }
    }

    onBlurMax = (e) => {
        console.log("onlucemax")
        if (this.state.maxPrice > this.state.initialMaxPrice || this.state.minPrice > this.state.maxPrice) {
            this.setState({
                ...this.state,
                maxPrice: this.state.initialMaxPrice,
                rightButtonPosition: this.state.lastRightButtonPosition
            })
        }
    }

    clearButtonClicked = () => {
        this.setState({
            ...this.state,
            leftButtonPosition: 0,
            rightButtonPosition: 100,
            minPrice: this.state.initialMinPrice,
            maxPrice: this.state.initialMaxPrice
        })
    }

    saveButtonClicked = () => {
        console.log("save button clicked")
    }


    render() {
        return (
            <div className="relative inline">
                {console.log("class comp"+ this.state.abc)}
                <FilterButton
                    buttonText={uistring.searchFilters.price}
                    onClick={() => {
                        this.setState(
                            {
                                ...this.state,
                                showFilterPopup: !this.state.showFilterPopup
                            }
                        )
                    }}

                    buttonRef={this.filterButtonRef}
                    isFilterApplied={this.state.initialMinPrice != this.state.minPrice ||
                        this.state.initialMaxPrice != this.state.maxPrice || this.showFilterPopup}
                />

                {/* Free cancellation popup */}
                <div ref={this.filterPopupRef} className={`${this.state.showFilterPopup ? "inline-block " : "hidden "} absolute left-0 top-[54px] right-auto z-50 bg-white border-[0.5px] rounded-xl 
                overflow-hidden shadow-lg `}>
                    <div className="block min-w-[400px]">
                        <div className="max-h-[calc(100vh - 300px)] p-5 overflow-y-auto">
                            <h4 className="pt-2 text-textColor-extraHeavy text-base pb-4">{uistring.searchFilters.averagePrice} {uistring.searchFilters.rupeeSymbol} {this.state.averagePrice}</h4>
                            <div className="relative">

                                {/* SLider code */}
                                <div ref={this.sliderRef} className="bg-border relative rounded-md top-0 w-full h-[2px]"></div>
                                <div className="h-[15px] top-[-2px] left-[-2px] bottom-[4px] w-full absolute">
                                    <button style={{ left: this.state.leftButtonPosition + "%" }}
                                        className="left-[0] absolute w-[27px] h-[27px] p-1 border border-border-dark bg-white rounded-full z-[102] ml-[-13.5px] top-[-10.5px]"
                                        onMouseDown={this.onMouseDownLeft} >
                                        <IoReorderThreeSharp
                                            className="rotate-90 text-background-dark" />
                                    </button>
                                    <button style={{ left: this.state.rightButtonPosition + "%" }}
                                        className="left-[100%] absolute w-[27px] h-[27px] p-1 border border-border-dark bg-white rounded-full z-[102] ml-[-13.5px] top-[-10.5px]"
                                        onMouseDown={this.onMouseDownRight}>
                                        <IoReorderThreeSharp
                                            className="rotate-90 text-background-dark" />
                                    </button>
                                </div>

                                {/* Min max price input button */}
                                <div className="flex items-center justify-center mt-7">
                                    <PriceInputField title={uistring.searchFilters.minPrice} minPrice={this.state.minPrice} onChange={this.onMinPriceChange} onBlur={this.onBlurMin} />
                                    <div className="m-2">-</div>
                                    <PriceInputField title={uistring.searchFilters.maxPrice} minPrice={this.state.maxPrice} onChange={this.onMaxPriceChange} onBlur={this.onBlurMax} />

                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between py-3 px-[14px] border-t border-t-border-light items-center ">

                            <ClearSavePane
                                isClearButtonDisbaled={this.state.initialMinPrice == this.state.minPrice &&
                                    this.state.initialMaxPrice == this.state.maxPrice}
                                clearButtonClicked={this.clearButtonClicked}
                                saveButtonClicked={this.saveButtonClicked}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        minPrice: state.searchDetail.searchMinPrice,
        maxPrice: state.searchDetail.searchMaxPrice
    }
};

export default connect(mapStateToProps) (PriceFilterClassComp)
