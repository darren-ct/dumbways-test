import { useState, useContext, useEffect } from "react";
import { AssignmentContext } from "../../pages/assignments/[id]";

import { useQuery, useMutation } from "@apollo/client";
import { GET_SINGLE_PERSON_ASSIGNMENT, PUT_ASSIGNMENTS, POST_ASSIGNMENTS, DELETE_ASSIGNMENTS} from "../../lib/names/assignments";

import Loader from "../notify/Loader";
import Button from "../basic/Button";
import Input from "../basic/Input";
import Error from "../notify/Error";

import {STAGE_ONE_ASSIGNMENTS, STAGE_TWO_ASSIGNMENTS} from "../../helper"

const UpdateAssignments = ({id, setUpdateModal, type}) => {
    const {refetch, setSuccessMsg, classId} = useContext(AssignmentContext);

    const [updateAs, {data, loading, error}] = useMutation(PUT_ASSIGNMENTS);
    const [deleteAs, {data:data2, loading:loading2, error:error2}] = useMutation(DELETE_ASSIGNMENTS);
    const [postAs, {data:data3, loading:loading3, error:error3}] = useMutation(POST_ASSIGNMENTS);
    const {data:data4, loading:loading4, error:error4} = useQuery(GET_SINGLE_PERSON_ASSIGNMENT, {
        notifyOnNetworkStatusChange:true,
        variables : {
            where: {
                student: {
                  id: id
                }
              }
        }
    });

    const analyseType = () => {
        if(type === "STAGEONE") return STAGE_ONE_ASSIGNMENTS;
        return STAGE_TWO_ASSIGNMENTS;
    };

    // State
    const[form, setForm] = useState(analyseType());

    console.log(form);

    
     // useEffect
     useEffect(()=>{
     document.body.classList.add('hide-bar');
     
     return () => {
        document.body.classList.remove('hide-bar');
        };

     },[]);

    //  useEffect(()=>{
    //     if(data || data2 || data3){
    //         setUpdateModal(false);
    //         setSuccessMsg("Assigment content Updated");
    //         refetch({
    //             id : props.id
    //         })
    //     }
    //  },[data,data2,data3]);

    //  useEffect(()=>{
    //      if(data4){
    //         refetch({
    //             where: {
    //                 student: {
    //                   id: id
    //                 }
    //               }
    //         })
    //      }
    //    },[]);

     useEffect(()=>{
         
     },[])

    //  Functions
    const submitForm = () => {
        // Check
        //  if data4 exist, put , if not post
    };

    const ignore = (e) => {
        e.stopPropagation();
    };

    const render1 = () => {
           return (
             <>
                <div className="w-full flex flex-row font-semibold text-lg mb-4">Chapter 1 : <p> 40%</p></div>

                <Input label="Card" placeholder="Numbers Only" form={form} setForm={setForm} name="card"/>
                <Input label="Contact, Navbar, & Layouting" placeholder="Numbers Only" form={form} setForm={setForm} name="cvl"/>
                <Input label="Form Submission" placeholder="Numbers Only"  form={form} setForm={setForm} name="formSub"/>
                <Input label="Creating Project Page" placeholder="Numbers Only"  form={form} setForm={setForm} name="projectPage"/>
                <Input label="Count Project Duration" placeholder="Numbers Only"  form={form} setForm={setForm} name="countProject"/>
                <Input label="Pemahaman Code" placeholder="Numbers Only"  form={form} setForm={setForm} name="code"/>
                <Input label="Pemahaman Instruksi" placeholder="Numbers Only"  form={form} setForm={setForm} name="instruksi"/>
                <Input label="Softskill" placeholder="Numbers Only" form={form} setForm={setForm} name="softskill"/>

                <div className="w-full flex flex-row font-semibold text-lg mb-4 mt-8">Chapter 2 : <p>60%</p></div>
        
                <Input label="Framework CSS" placeholder="Numbers Only"  form={form} setForm={setForm} name="css"/>
                <Input label="NodeJs" placeholder="Numbers Only"  form={form} setForm={setForm} name="node"/>
                <Input label="Routing" placeholder="Numbers Only"  form={form} setForm={setForm} name="routing"/>
                <Input label="Array of Object Manipulation" placeholder="Numbers Only"  form={form} setForm={setForm} name="arrayOfObj"/>
                <Input label="Data Modelling" placeholder="Numbers Only"  form={form} setForm={setForm} name="dataModelling"/>
                <Input label="Finishing CRUD" placeholder="Numbers Only" form={form} setForm={setForm} name="CRUD"/>
                <Input label="Authentication" placeholder="Numbers Only" form={form} setForm={setForm} name="Auth"/>
                <Input label="Relation & File Upload" placeholder="Numbers Only"  form={form} setForm={setForm} name="RelationFile"/>
                <Input label="Pemahaman Code" placeholder="Numbers Only"  form={form} setForm={setForm} name="code2"/>
                <Input label="Pemahaman Instruksi" placeholder="Numbers Only"  form={form} setForm={setForm} name="instruksi2"/>
                <Input label="Softskill" placeholder="Numbers Only"  form={form} setForm={setForm} name="softskill2"/>
             </>
           )
    };

    const render2 = () => {
           return (
            <>
            <div className="w-full flex flex-row font-semibold text-lg mb-4"> Frontend : <p> 15%</p></div>

            <Input label="React JS Fundamentals" placeholder="Numbers Only" form={form} setForm={setForm} name="reactFunc"/>
            <Input label="React JS Advance" placeholder="Numbers Only" form={form} setForm={setForm} name="reactAdv"/>
            <Input label="Hooks Feature" placeholder="Numbers Only"  form={form} setForm={setForm} name="hooksFeature"/>
            <Input label="Pemahaman Code" placeholder="Numbers Only"  form={form} setForm={setForm} name="code"/>
            <Input label="Pemahaman Instruksi" placeholder="Numbers Only"  form={form} setForm={setForm} name="instruksi"/>
           
            <div className="w-full flex flex-row font-semibold text-lg mb-4 mt-8">Backend : <p>15%</p></div>
    
            <Input label="Fundamental Backend" placeholder="Numbers Only"  form={form} setForm={setForm} name="backendFunc1"/>
            <Input label="Object Relational Mapping(ORM)" placeholder="Numbers Only"  form={form} setForm={setForm} name="ORM"/>
            <Input label="Authentication and File Upload" placeholder="Numbers Only"  form={form} setForm={setForm} name="fileUpload"/>
            <Input label="Pemahaman Code" placeholder="Numbers Only"  form={form} setForm={setForm} name="code2"/>
        
            <div className="w-full flex flex-row font-semibold text-lg mb-4 mt-8">Fullstack : <p>25%</p></div>
    
            <Input label="Integration" placeholder="Numbers Only"  form={form} setForm={setForm} name="integration"/>
            <Input label="Payment Gateway" placeholder="Numbers Only"  form={form} setForm={setForm} name="payment"/>
            <Input label="Pemahaman Code" placeholder="Numbers Only"  form={form} setForm={setForm} name="code3"/>
            <Input label="Pemahaman Instruksi" placeholder="Numbers Only"  form={form} setForm={setForm} name="instruksi3"/>

            <div className="w-full flex flex-row font-semibold text-lg mb-4 mt-8">Additional Material : <p>15%</p></div>
    
            <Input label="Deployment to IDCH" placeholder="Numbers Only"  form={form} setForm={setForm} name="deployment"/>
            <Input label="Todo App" placeholder="Numbers Only"  form={form} setForm={setForm} name="todo"/>
            <Input label="Pemahaman Code" placeholder="Numbers Only"  form={form} setForm={setForm} name="code4"/>
            <Input label="Pemahaman Instruksi" placeholder="Numbers Only"  form={form} setForm={setForm} name="instruksi4"/>

            <div className="w-full flex flex-row font-semibold text-lg mb-4 mt-8">Todo App</div>
    
           <Input label="Pemahaman React Native" placeholder="Numbers Only"  form={form} setForm={setForm} name="reactnative"/>
           <Input label="Navigation" placeholder="Numbers Only"  form={form} setForm={setForm} name="navigation"/>
           <Input label="Integration" placeholder="Numbers Only"  form={form} setForm={setForm} name="integration"/>
           <Input label="Pemahaman Instruksi" placeholder="Numbers Only"  form={form} setForm={setForm} name="instruksi5"/>

           <div className="w-full flex flex-row font-semibold text-lg mb-4 mt-8">Final Task: <p>30%</p></div>
    
          <Input label="Web Functionality" placeholder="Numbers Only"  form={form} setForm={setForm} name="webfunc"/>
          <Input label="Web Interface" placeholder="Numbers Only"  form={form} setForm={setForm} name="webinterface"/>
          <Input label="Functionality Backend" placeholder="Numbers Only"  form={form} setForm={setForm} name="backendFunc2"/>
          <Input label="Pemahaman Code" placeholder="Numbers Only"  form={form} setForm={setForm} name="code5"/>
          <Input label="Pemahaman Instruksi" placeholder="Numbers Only"  form={form} setForm={setForm} name="instruksi6"/>
         </>
           )
    };

    //  
    // if(loading || loading2 || loading3 || loading4 ) return <Loader/>
    if(error || error2 || error3 || error4) return <Error error="Make sure all inputs are number and filled"/>


  return (
    <div style={{background:"rgba(0,0,0,.8)",zIndex:49}} className='w-full h-full fixed top-0 left-0 flex items-center justify-center' onClick={()=>{setUpdateModal(false)}}>

    <div className='h-96 relative py-12 px-24 bg-white flex flex-col items-center rounded-md' onClick={ignore} style={{overflowY:"scroll"}}>
        <span className="absolute top-4 right-4 cursor-pointer text-xl font-semibold" onClick={()=>{setUpdateModal(false)}}>X</span>

        <span className='text-xl font-semibold'>Edit Assigment Scores</span>
        <span className="mb-12">Please fill in all forms. Make sure all are numbers.</span>
        {type === "STAGEONE" ? render1() : render2()}
        <Button content="Edit Assignment Scores" onClick={submitForm} theme="primary" width="full" mt={4}/>
        <Button content="Delete All Data" onClick={()=>{}} theme="alert" width="full" mt={4} />
    </div>

   </div>
  )
}

export default UpdateAssignments