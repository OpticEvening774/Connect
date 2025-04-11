import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { List, ListItemButton, ListItemText, Collapse, Typography } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function TreeItem({ node }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isFolder = node.mimeType === 'application/vnd.google-apps.folder';

  const handleClick = () => {
    if (isFolder) {
      setOpen(!open);
    } else {
      // If it's a file, navigate to preview
      navigate(`/view/${node.id}`);
    }
  };

  return (
    <>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary={node.name} />
        {isFolder ? (open ? <ExpandLess /> : <ExpandMore />) : null}
      </ListItemButton>
      {isFolder && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding sx={{ pl: 4 }}>
            {node.children && node.children.map((child) => (
              <TreeItem key={child.id} node={child} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

function ResourceTree() {
  const [tree, setTree] = useState(null);

  useEffect(() => {
    axios.get('/api/resources/tree')
      .then(response => setTree(response.data))
      .catch(error => console.error('Error fetching tree:', error));
  }, []);

  if (!tree) {
    return <Typography>Loading folder tree...</Typography>;
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Resource Folder Tree
      </Typography>
      <List>
        <TreeItem node={tree} />
      </List>
    </>
  );
}

export default ResourceTree;
