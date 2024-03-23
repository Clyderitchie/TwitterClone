import { gql } from '@apollo/client';

// User
export const QUERY_USERS = gql`
query getAllUsers {
  getAllUsers {
    _id
    username
  }
}
`; // Done

export const QUERY_USER = gql`
query getUser($userId: ID) {
  getUser(userId: $userId) {
    _id
    username
    bio {
      _id
      text
      profilePicture
      location
      website
      birthday
    }
    posts {
      text
      imageUrl
      userId {
        username
      }
      likes {
        username
      }
      comments {
        text
        userId {
          username
        }
        likes {
          username
        }
      }
    }
    followers {
      username
    }
    following {
      username
    }
  }
}
`; // Done

// Post
export const QUERY_POSTS = gql`
query getAllPosts {
  getAllPosts {
    _id
    text
    imageUrl
    createdAt
    userId {
      _id
      username
    }
    likes {
      username
    }
    comments {
      _id
      text
      createdAt
      userId {
        username
      }
      likes {
        username
      }
    }
  }
}
`; // Done

export const QUERY_POST = gql`
query getPost($postId: ID) {
  getPost(postId: $postId) {
    _id
    text
    imageUrl
    userId {
      username
    }
    likes {
      username
    }
    comments {
      _id
      text
      userId {
        username
      }
      likes {
        username
      }
    }
  }
}
`; // Done

// Comment
export const QUERY_COMMENTS = gql`
query GetAllComments {
  getAllComments {
    _id
    text
    userId {
      username
    }
    likes {
      username
    }
  }
}
`; // Done

export const QUERY_COMMENT =gql`
query GetComment($commentId: ID) {
  getComment(commentId: $commentId) {
    _id
    text
    userId {
      username
    }
    likes {
      username
    }
  }
}
`; // Done

// Me
export const QUERY_ME = gql`
query Me {
  me {
    _id
    username
    bio {
      _id
      text
      profilePicture
      location
      website
      birthday
    }
    posts {
      _id
      text
      imageUrl
      createdAt
      userId {
        username
      }
      likes {
        username
      }
      comments {
        text
        userId {
          username
        }
        likes {
          username
        }
      }
    }
    followers {
      username
    }
    following {
      username
    }
  }
}
`;