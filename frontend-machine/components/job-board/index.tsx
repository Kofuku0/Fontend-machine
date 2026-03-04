
import { useState,useRef } from "react";

export default function JobBoard(){
       const [fetchingJobDetails,setFetchingDetails] = useState(false);
       const [page,setPage] = useState(1);
       const [jobIds,setJobIds] = useState(null);
       const [jobs,setJobs] = useState([]);
       const isMounted = useRef(true);

   

       
}