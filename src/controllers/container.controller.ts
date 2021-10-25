import { Request, Response } from 'express';
import { Container, ContainerInput } from '../models/container.model';
import {v4 as uuidv4} from 'uuid';


const setContainerStatus = async (status, containerCreated, timeout) => {
  return setTimeout( async () => await Container.updateOne({ _id: containerCreated._id }, { status }), timeout ) ;
}

//    ___              _       
//  / __|_ _ ___ __ _| |_ ___ 
// | (__| '_/ -_) _` |  _/ -_)
// \___|_| \___\__,_|\__\___|

const createContainer = async (req: Request, res: Response) => {
  const { application } = req.body;
  console.log(application, req.body) ;
  if (!application) {
    return res.status(422).json({ message: 'The field application is required' });
  }

  // Create container with STARTING status
  let status :string  = "STARTING"
  let id :string      = uuidv4();

  const containerInput: ContainerInput = {
    application,
    status,
    id,
  };

  const containerCreated = await Container.create(containerInput);

  res.status(202).json({ data: containerCreated });


  setContainerStatus("RUNNING", containerCreated, 20000) ;

  if(Math.random() < .5) {
    console.log("Scheduling container error", containerCreated) ;
    setContainerStatus("ERROR", containerCreated, 40000) ;
  }

};


//    ___             _   _ _    _   
//   | _ \___ __ _ __| | | (_)__| |_ 
//  |   / -_) _` / _` | | | (_-<  _|
// |_|_\___\__,_\__,_| |_|_/__/\__|

const getAllContainers = async (req: Request, res: Response) => {
  // const containers = await Container.find({"status": { $in: ["STARTING","RUNNING"] } }).sort('-createdAt').exec();
  const containers = await Container.find({}).sort('-createdAt').exec();

  return res.status(200).json({ data: containers });
};


const getRunningContainers = async (req: Request, res: Response) => {
  const containers = await Container.find({"status": { $in: ["STARTING","RUNNING"] } }).sort('-createdAt').exec();

  return res.status(200).json({ data: containers });
};



const stopContainer = async (req: Request, res: Response) => {
  const { application } = req.body;
  console.log("Stopping containers of application", application, req.body) ;
  if (!application) {
    return res.status(422).json({ message: 'The field application is required' });
  }

  const containers = await Container.find({ application: application, status: { $in :["STARTING","RUNNING"] } });

  res.status(202).json({ data: containers });

  let status = "STOPPING" ;
  await Container.updateMany({ application: application, status: { $in :["STARTING","RUNNING"] } }, { status })

  status = "TERMINATED" ;
  setTimeout( async () => await Container.updateMany({ application: application, status: "STOPPING" }, { status }), 2000 ) ;

};




const getContainer = async (req: Request, res: Response) => {
  const { id } = req.params;

  const container = await Container.findOne({ _id: id });

  if (!container) {
    return res.status(404).json({ message: `Container with id "${id}" not found.` });
  }

  return res.status(200).json({ data: container });
};








const updateContainer = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, name } = req.body;

  const container = await Container.findOne({ _id: id });

  if (!container) {
    return res.status(404).json({ message: `Container with id "${id}" not found.` });
  }

  if (!name || !description) {
    return res.status(422).json({ message: 'The fields name and description are required' });
  }

  await Container.updateOne({ _id: id }, { name, description });

  const containerUpdated = await Container.findById(id, { name, description });

  return res.status(200).json({ data: containerUpdated });
};

const deleteContainer = async (req: Request, res: Response) => {
  const { id } = req.params;

  await Container.findByIdAndDelete(id);

  return res.status(200).json({ message: 'Container deleted successfully.' });
};

export { createContainer, deleteContainer, getRunningContainers, getAllContainers, getContainer, updateContainer, stopContainer };
