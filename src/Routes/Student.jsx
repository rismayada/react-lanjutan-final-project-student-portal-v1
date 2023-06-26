// TODO: answer here
import React, { useEffect, useState } from 'react';
import { Select, Table, TableContainer, Thead, Tbody, Tr, Td, Th } from '@chakra-ui/react';
import Footer from '../components/Footer';

const Student = () => {
  // TODO: answer here
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedFaculty, setSelectedFaculty] = useState('All');

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudentsByFaculty();
  }, [students, selectedFaculty]);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:3001/student');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };
  const filterStudentsByFaculty = () => {
    if (selectedFaculty === 'All') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter((student) => student.faculty === selectedFaculty);
      setFilteredStudents(filtered);
    }
  };

  const handleFacultyChange = (event) => {
    setSelectedFaculty(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/student/${id}`, {
        method: 'DELETE',
      });
      const updatedStudents = students.filter((student) => student.id !== id);
      setStudents(updatedStudents);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* TODO: answer here */}
      <div className="container-student">
        <h2>All Students</h2>
        <Select value={selectedFaculty} onChange={handleFacultyChange} data-testid="filter">
          <option value="All">All</option>
          <option value="Fakultas Ekonomi">Fakultas Ekonomi</option>
          <option value="Fakultas Ilmu Sosial dan Politik">Fakultas Ilmu Sosial dan Politik</option>
          <option value="Fakultas Teknik">Fakultas Teknik</option>
          <option value="Fakultas Teknologi Informasi dan Sains">Fakultas Teknologi Informasi dan Sains</option>
        </Select>

        {filteredStudents.length > 0 ? (
          <TableContainer>
            <Table id="table-student">
              <Thead>
                <Tr>
                  <Th>No</Th>
                  <Th>Full Name</Th>
                  <Th>Faculty</Th>
                  <Th>Program Study</Th>
                  <Th>Option</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredStudents.map((student, index) => (
                  <Tr key={student.id} className="student-data-row">
                    <Td>{index + 1}</Td>
                    <Td>
                      <a href={`/student/${student.id}`}>{student.fullname}</a>
                    </Td>
                    <Td>{student.faculty}</Td>
                    <Td>{student.programStudy}</Td>
                    <Td>
                      <button data-testid={`delete-${student.id}`} onClick={() => handleDelete(student.id)}>
                        Delete
                      </button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <p>Loading ...</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Student;
