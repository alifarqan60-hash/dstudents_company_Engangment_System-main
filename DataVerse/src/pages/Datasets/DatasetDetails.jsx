import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { IMAGES } from '../../constants/images';
import { getDatasetById } from '../../api/dataset';
import Loader from '../../components/Loader';

const DatasetDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();
    const [dataset, setDataset] = useState(location.state?.item || null);
    const [loading, setLoading] = useState(!dataset);

    useEffect(() => {
        const fetchDataset = async () => {
            if (!dataset && id) {
                setLoading(true);
                const data = await getDatasetById(id);
                if (data) {
                    setDataset(data);
                }
                setLoading(false);
            }
        };
        fetchDataset();
    }, [id, dataset]);

    if (loading) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center">
                <Loader />
                <p className="mt-4 text-gray-600">Loading dataset details...</p>
            </div>
        );
    }

    if (!dataset) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center">
                <p className="text-red-500 text-xl font-bold">Dataset not found.</p>
                <button
                    className="mt-4 bg-customBlue text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 transition"
                    onClick={() => navigate('/app/datasets')}
                >
                    Back to Datasets
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen max-w-screen-lg bg-gray-100 p-8 w-full">
            <div className="bg-customBlue text-white p-6 rounded-lg shadow-lg mb-8 w-full">
                <h1 className="text-3xl font-bold">Dataset Details</h1>
                <p className="text-lg mt-2">View detailed information about the dataset.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-8 w-full">
                <button
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md shadow hover:bg-gray-400 transition mb-4"
                    onClick={() => navigate('/app/datasets')}
                >
                    Back to Datasets
                </button>
                <div className="flex flex-col gap-4">
                    <div className='flex items-center justify-between'>
                        <div className="mb-4">
                            <h2 className="text-2xl font-bold mb-2">{dataset.title}</h2>
                            <p className="text-gray-700">{dataset.description}</p>
                        </div>
                        <div className="mb-4">
                            <img
                                src={dataset.imgurl || IMAGES.datasetImg}
                                alt={dataset.title}
                                className="w-64 h-auto rounded-md shadow-md"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">Tags</h3>
                        <div className="flex gap-2 items-center flex-wrap">
                            {dataset.tags?.map((tag, index) => (
                                <span
                                    key={index}
                                    className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-md"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className="mb-4 flex gap-4">
                        <div className='flex flex-col'>
                            <h3 className="text-lg font-semibold mb-2">View</h3>
                            <a
                                href={`${"http://localhost:4000/api"}/resource/resolve?url=${encodeURIComponent(dataset.url)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition inline-block text-center"
                            >
                                View Dataset
                            </a>
                        </div>
                        <div className='flex flex-col'>
                            <h3 className="text-lg font-semibold mb-2">Download</h3>
                            <a
                                href={`${"http://localhost:4000/api"}/resource/resolve?url=${encodeURIComponent(dataset.url)}&download=true`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-customBlue text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition inline-block text-center"
                            >
                                Download Dataset
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatasetDetails;
