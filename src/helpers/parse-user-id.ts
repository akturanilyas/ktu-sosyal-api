import jwtDecode from 'jwt-decode';

interface MyToken {
    id: string;
    iat: number;
    exp: number;
}

export const parseUserId = (req, res) => {
  const token = <string>req.headers['auth-token'];

  if (!token) {
    res.status(401).send('unauthorized');
    return '';
  }

  const decoded = jwtDecode<MyToken>(token);
  return <string>decoded.id;
};
