import React, { useEffect, useState } from 'react';
import { Table } from '@radix-ui/themes';
import styled from 'styled-components';

// Styled container with a dark background image and subtle glass effect
const GlassTableContainer = styled.div`
  background: url('img/bg-image.webp') no-repeat center center fixed;
  background-size: cover;
  backdrop-filter: blur(10px);
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  margin: auto;
  margin-top: 50px;
  border: 1px solid rgba(139, 0, 0, 0.3); /* Reduced red contrast */
`;

const StyledTable = styled(Table.Root)`
  width: 100%;
  color: #e0e0e0; /* Light text for contrast against dark background */
  background-color: rgba(0, 0, 0, 0.6); /* Darken the table background */
  border-radius: 10px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledHeaderCell = styled(Table.ColumnHeaderCell)`
  background-color: rgba(139, 0, 0, 0.5); /* Reduced red contrast */
  color: #ffffff;
  padding: 15px;
`;

const StyledRow = styled(Table.Row)`
  &:nth-child(odd) {
    background-color: rgba(0, 0, 0, 0.5);
  }
  &:nth-child(even) {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const StyledCell = styled(Table.Cell)`
  padding: 15px;
  border-bottom: 1px solid rgba(139, 0, 0, 0.2); /* Subtle red accent */
`;

const NameCell = styled(StyledCell)`
  max-width: 200px;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
`;

const ProfessorCell = styled(StyledCell)`
  max-width: 200px;
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: none;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid rgba(139, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.5);
  color: #e0e0e0;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid rgba(139, 0, 0, 0.3);
  background-color: rgba(139, 0, 0, 0.5);
  color: #ffffff;
  cursor: pointer;

  &:hover {
    background-color: rgba(139, 0, 0, 0.7);
  }
`;

const DropdownContainer = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Dropdown = styled.details`
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  margin-bottom: 10px;
  border: 1px solid rgba(139, 0, 0, 0.3);
`;

const Summary = styled.summary`
  padding: 10px;
  background-color: rgba(139, 0, 0, 0.5);
  color: #ffffff;
  cursor: pointer;
`;

const DropdownContent = styled.div`
  padding: 10px;
`;

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch all courses initially
    fetch('https://availability-tracker-d2375f8d0b7f.herokuapp.com/get_data')
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleSearch = () => {
    fetch(`https://availability-tracker-d2375f8d0b7f.herokuapp.com/course_num=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => setCourses(data))
      .catch((error) => console.error('Error:', error));
  };

  const filteredCourses = courses.filter((course) =>
    course.course_num.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.crn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.professor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.department.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <GlassTableContainer>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Search courses using Course Number..."
          value={searchTerm}
          autoFocus
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </SearchContainer>

      {/* Table for larger screens */}
      <StyledTable variant="surface">
        <Table.Header>
          <StyledRow>
            <StyledHeaderCell>Course No</StyledHeaderCell>
            <StyledHeaderCell>CRN</StyledHeaderCell>
            <StyledHeaderCell>Name</StyledHeaderCell>
            <StyledHeaderCell>Professor</StyledHeaderCell>
            <StyledHeaderCell>Department</StyledHeaderCell>
            <StyledHeaderCell>Seats Available</StyledHeaderCell>
            <StyledHeaderCell>Time Difference</StyledHeaderCell>
          </StyledRow>
        </Table.Header>
        <Table.Body>
          {filteredCourses.map((course) => (
            <StyledRow key={course.id}>
              <StyledCell>{course.course_num}</StyledCell>
              <StyledCell>{course.crn}</StyledCell>
              <NameCell>{course.name}</NameCell>
              <ProfessorCell>{course.professor}</ProfessorCell>
              <StyledCell>{course.department}</StyledCell>
              <StyledCell>{course.seats}</StyledCell>
              <StyledCell>{course.time_difference} ago</StyledCell>
            </StyledRow>
          ))}
        </Table.Body>
      </StyledTable>

      {/* Dropdowns for mobile screens */}
      <DropdownContainer>
        {filteredCourses.map((course) => (
          <Dropdown key={course.id}>
            <Summary>{course.course_num} - {course.crn}-{course.seats} seats available</Summary>
            <DropdownContent>
              <p><strong>Name:</strong> {course.name}</p>
              <p><strong>Professor:</strong> {course.professor}</p>
              <p><strong>Department:</strong> {course.department}</p>
              <p><strong>Seats Available:</strong> {course.seats}</p>
              <p><strong>Time Difference:</strong> Updated {course.time_difference} ago</p>
            </DropdownContent>
          </Dropdown>
        ))}
      </DropdownContainer>
    </GlassTableContainer>
  );
};

export default CourseTable;
