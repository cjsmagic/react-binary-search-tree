import classnames from 'classnames';
import React, { useState, useRef, useEffect } from 'react';
import './style.css';

function NodeComp({ node, className }) {
  return node ? (
    <div
      className={classnames('node-wrapper', {
        'node-left-arrow': node && node.left,
        'node-right-arrow': node && node.right
      })}
    >
      <div className={className}>{node.data}</div>
      <div className="node-child-wrapper">
        {node.left && <NodeComp node={node.left} className="node node--left" />}
        {node.right && (
          <NodeComp node={node.right} className="node node--right" />
        )}
      </div>
    </div>
  ) : null;
}

class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor(root = null) {
    this.root = root;
  }

  add(data) {
    if (this.root === null) {
      this.root = new Node(data);
      return this.root;
    }

    function searchNode(node) {
      if (data === node.data) {
        return null;
      }

      if (data < node.data) {
        if (node.left) {
          return searchNode(node.left);
        } else {
          node.left = new Node(data);
          return node.left;
        }
      }

      if (data > node.data) {
        if (node.right) {
          return searchNode(node.right);
        } else {
          node.right = new Node(data);
          return node.right;
        }
      }
    }

    return searchNode(this.root);
  }

  inverse() {
    if (this.root === null) {
      return null;
    }
    function recursive(node) {
      if (node.left) {
        recursive(node.left);
      }
      if (node.right) {
        recursive(node.right);
      }

      const temp = node.left;
      node.left = node.right;
      node.right = temp;
    }

    recursive(this.root);
  }
}

export default function App() {
  const ref = useRef(new BST());
  const [node, setNode] = useState(null);
  const [data, setData] = useState('');

  useEffect(() => {
    if (ref.current) {
      const bst = ref.current;

      const intialValues = [50, 30, 70, 20, 40, 60, 80];

      intialValues.forEach(value => bst.add(value));

      setNode({ ...bst.root });
      setData('');
    }
  }, [ref.current]);

  const add = value => {
    const bst = ref.current;
    bst.add(value);
    setNode({ ...bst.root });
    setData('');
  };

  const inverse = () => {
    const bst = ref.current;
    bst.inverse();
    setNode({ ...bst.root });
  };

  return (
    <>
      <div>
        <input
          value={data}
          onChange={e => {
            setData(() => e.target.value);
          }}
          placeholder="Enter data"
        />
        <button
          type="button"
          onClick={() => {
            add(data);
          }}
        >
          Add
        </button>

        <button
          type="button"
          onClick={() => {
            inverse();
          }}
        >
          Inverse
        </button>
      </div>

      {node && <NodeComp node={node} className="node" />}
    </>
  );
}
