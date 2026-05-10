import React, { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Tag from "../../components/Datasets/Tag";
import CustomButton from "../../components/Datasets/CustomButton";
import CustomInput from "../../components/Datasets/CustomInput";
import DataSetcategorySection from "../../components/Datasets/DataSetcategorySection/DataSetcategorySection";
import { TAGS } from "../../constants/datasets";
import { getAlldatasets } from "../../api/dataset";

const DatasetsScreen = () => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [tileView, setTileView] = useState(false);

  const handleSearchClick = (val) => {
    console.log("searchText", searchText);
    setSearchText(val);
    if (val) {
      setTileView(true);
    } else if (val?.length === 0) {
      setTileView(false);
    }
  };

  const [fetcheddatasetsarr, setFetcheddatasetarr] = useState([]);
  const [filter, setFilter] = useState(false);
  const [filterarr, setFiltersArr] = useState(TAGS);

  const getSelectedTag = (tagdata) => {
    const arr = filterarr;

    if (arr?.includes(tagdata?.title)) {
      if (tagdata.active === false) {
        arr.splice(arr.indexOf(tagdata?.title), 1);
      }
    } else {
      if (tagdata?.active) {
        arr.push(tagdata?.title);
      }
    }

    if (arr.length > 0) {
      setFilter(true);
    } else {
      setFilter(false);
    }

    setFiltersArr(arr);

    console.log("filter array is : ", arr);
  };

  const handleResetFilters = () => {
    let arr = TAGS;
    let myarr = arr.map((item) => {
      let myitem = item;
      myitem.active = false;
      return myitem;
    });
    setFiltersArr(myarr);
    setFilter(false);
  };

  const handleGetAllDatasets = async () => {
    const resp = await getAlldatasets();
    console.log("resp in data is  : ", resp);
    setFetcheddatasetarr(resp);
  };

  useEffect(() => {
    handleGetAllDatasets();
  }, []);

  return (
    <div className="min-h-screen bg-white p-8 rounded-tl-3xl rounded-bl-3xl">
      <div className="bg-customBlue text-white p-6 rounded-lg shadow-lg mb-8">
        <h1 className="text-3xl font-bold">Datasets</h1>
        <p className="text-lg mt-2">
          Explore, analyze, and share quality data. Learn more about data types,
          creating, and collaborating.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="flex justify-between items-center mb-6">
          <CustomButton
            label={"New Dataset"}
            icon={<FaPlus />}
            onClick={() => navigate("/admin/datasets/new-dataset")}
            bgcolor={"bg-customBlue"}
            className="bg-customBlue text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
          />
          <CustomButton
            label={"Reset Filters"}
            onClick={handleResetFilters}
            bgcolor={"bg-customBlue"}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-400 transition"
          />
        </div>
        <div className="flex flex-col gap-4 mb-6">
          <CustomInput onchangetext={(val) => handleSearchClick(val)} />
          <div className="flex gap-2 items-center flex-wrap">
            {filterarr?.map((item) => (
              <Tag
                key={item.title}
                title={item.title}
                active={item.active}
                onclick={getSelectedTag}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          {fetcheddatasetsarr.length > 0 && (
            <DataSetcategorySection data={fetcheddatasetsarr} />
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetsScreen;
