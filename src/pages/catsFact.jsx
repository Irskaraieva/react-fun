import Axios from "axios";
import { useQuery } from "@tanstack/react-query";

const CatFact = () => {

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["cat"],
        queryFn: async () => {
            const response = await Axios.get("https://catfact.ninja/fact");
            return response.data;
        }
    });

    if (isError) {
        return <h1 className="has-text-centered is-size-4">Error...</h1>;
    }

    return (
        <div className="container has-text-centered">
            <div className="block">
                <div className="notification  notification-color pt-0">
                    <h4 className="title is-4">Interesting fact about cats:</h4>
                    {isLoading ?
                        <h1 className="has-text-centered is-size-4 mb-6">Loading...</h1> :
                        <p>{data?.fact}</p>
                    }
                </div>

                <button
                    onClick={refetch}
                    className="button mb-5 btn-generate">
                    Generate another Fact
                </button>
            </div>
        </div>
    );
}

export default CatFact;
