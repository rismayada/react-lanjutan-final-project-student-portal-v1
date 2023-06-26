// TODO: answer here

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Grid, Button, Input, Select, Flex, Heading, Box } from '@chakra-ui/react';
import Footer from '../components/Footer';

const EditStudent = () => {
  // TODO: answer here
  const [students, setStudents] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [faculty, setFaculty] = useState('');

  const { id } = useParams();
  const navigate = useNavigate();

  const fetchStudents = () => {
    fetch(`http://localhost:3001/student/${id}`)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setStudents(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setStudents((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const { fullname, profilePicture, address, phoneNumber, birthDate, gender, programStudy } = students;

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    if (programStudy === 'Ekonomi' || programStudy === 'Manajemen' || programStudy === 'Akuntansi') {
      setFaculty('Fakultas Ekonomi');
    } else if (programStudy === 'Administrasi Publik' || programStudy === 'Administrasi Bisnis' || programStudy === 'Hubungan Internasional') {
      setFaculty('Fakultas Ilmu Sosial dan Politik');
    } else if (programStudy === 'Teknik Sipil' || programStudy === 'Arsitektur') {
      setFaculty('Fakultas Teknik');
    } else {
      setFaculty('Fakultas Teknologi Informasi dan Sains');
    }
  }, [programStudy]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedStudent = {
      fullname,
      profilePicture,
      address,
      phoneNumber,
      birthDate,
      gender,
      programStudy,
      faculty,
    };

    try {
      await updateStudent(updatedStudent);
      navigate('/student');
    } catch (error) {
      console.log('Failed to update student data:', error);
    }
  };

  const updateStudent = async (studentData) => {
    try {
      const response = await fetch(`http://localhost:3001/student/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Student data updated successfully', responseData);
      } else {
        console.log('Failed to update student data');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <Flex direction="column" minH="100vh">
      <Grid flex="1" px={'16'} py={'20'} gap={3}>
        {isLoading ? (
          <p>Loading ...</p>
        ) : (
          <Box>
            <Heading my={'4'}>Edit Student</Heading>
            <Flex w={'full'} gap={'5'}>
              <Box>
                <img src={profilePicture} alt="" />
              </Box>

              <Box w={'full'}>
                <form action="" id="form-student" onSubmit={handleSubmit}>
                  <Grid gap={2}>
                    <div>
                      <label htmlFor="input-name">Fullname</label>
                      <Input type="text" id="input-name" name="fullname" data-testid="name" value={fullname || ''} onChange={handleChange} />
                    </div>
                    <div>
                      <label htmlFor="input-profilePict">Profile Picture</label>
                      <Input type="text" id="input-profilePict" name="profilePicture" data-testid="profilePicture" value={profilePicture || ''} onChange={handleChange} />
                    </div>
                    <div>
                      <label htmlFor="input-address">Address</label>
                      <Input type="text" id="input-address" name="address" data-testid="address" value={address || ''} onChange={handleChange} />
                    </div>
                    <div>
                      <label htmlFor="input-address">Phone Number</label>
                      <Input type="text" id="input-phone" name="phoneNumber" data-testid="phoneNumber" value={phoneNumber || ''} onChange={handleChange} />
                    </div>
                    <div>
                      <label htmlFor="input-date">Birth Date</label>
                      <Input type="date" id="input-date" data-testid="date" name="birthDate" value={birthDate || ''} onChange={handleChange} />
                    </div>
                    <div>
                      <label htmlFor="input-gender">Gender</label>
                      <Select name="gender" id="input-gender" data-testid="gender" value={gender || ''} onChange={handleChange}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="input-prody">Program Study</label>
                      <Select name="programStudy" id="input-prody" data-testid="prody" value={programStudy || ''} onChange={handleChange}>
                        <option value="Ekonomi">Ekonomi</option>
                        <option value="Manajemen">Manajemen</option>
                        <option value="Akuntansi">Akuntansi</option>
                        <option value="Administrasi Publik">Administrasi Publik</option>
                        <option value="Administrasi Bisnis">Administrasi Bisnis</option>
                        <option value="Hubungan Internasional">Hubungan Internasional</option>
                        <option value="Teknik Sipil">Teknik Sipil</option>
                        <option value="Arsitektur">Arsitektur</option>
                        <option value="Matematika">Matematika</option>
                        <option value="Fisika">Fisika</option>
                        <option value="Informatika">Informatika</option>
                      </Select>
                    </div>
                  </Grid>
                  <Box my={'4'}>
                    <Button type="submit" value="Edit Student" id="edit-btn" data-testid="edit-btn">
                      Edit Student
                    </Button>
                  </Box>
                </form>
              </Box>
            </Flex>
          </Box>
        )}
      </Grid>

      <Footer bottom={0} />
    </Flex>
  );
};

export default EditStudent;
