import { Grid } from "@mui/material";
import AdminTable from "./PostManager";
import Sidebar from "~/components/Layouts/Sidebar";

function AdminPage() {
    return (
        <>
            {" "}
            <Grid container>
                <Grid item flex={2} sx={{ overflow: "auto" }} display={{ xs: "none", md: "block" }}>
                    <Sidebar />
                </Grid>
                <Grid item flex={8} sx={{ mt: 12, height: "100%", overflow: "auto" }}>
                    <AdminTable />
                </Grid>
            </Grid>
        </>
    );
}

export default AdminPage;
