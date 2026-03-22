import AddServerForm from "@/components/ui/add-server-form";

const AddServer = ()=>{
    return <AddServerForm onSubmit={(e)=>console.info(e)}/>
}

export default AddServer;