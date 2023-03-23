import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DynamicDataType } from "../../../ApiTypes"
import { useGetApi } from "../../../controller/Hooks"

const TypeList = () => {
    const { data, error, isLoading } = useGetApi<DynamicDataType[]>('/api/dynamicdata/types')

    const navigate = useNavigate();

    if (isLoading) return ( <>Loading</> );

    return (
        <>
            <Typography variant="h4">Dyanamic Data</Typography>
            {
                data?.map((type) => (
                    <div key={type.name}>
                        {type.name}
                        <Button variant="contained" onClick={() => navigate(`/admin/dynamicdata/${type.name}`)}>Edit</Button>
                    </div>
                ))
            }
        </>
    )
}

export default TypeList;
